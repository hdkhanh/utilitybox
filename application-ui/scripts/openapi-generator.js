#!/usr/bin/env node
const path = require("path");
const fs = require("fs");
const mkdirp = require("mkdirp");
const axios = require("axios");
const util = require("util");
const childProcess = require("child_process");
const execPromise = util.promisify(childProcess.exec);

const BASE_URL = "http://localhost:8080";
const DEFAULT_OUTPUT_DIR = "./src/backend/api-client/openapi/generated/";
const DEFAULT_TEMPLATE = "./src/backend/api-client/openapi/templates";
const DEFAULT_OUTPUT_FILE = "openapi-spec.json";

const SPECS = [
    { path: "/v3/api-docs", name: "auth-service" },
];

const deleteExistSpec = async () => {
    console.info("Deleting...");
    const generatedFolder = path.resolve(DEFAULT_OUTPUT_DIR);
    if (fs.existsSync(generatedFolder)) {
        fs.rmSync(generatedFolder, { recursive: true });
    }
};

const downloadSpec = async (spec) => {
    console.info("Downloading...");
    const { data } = await axios.get(spec.path);
    const resultPath = path.resolve(DEFAULT_OUTPUT_DIR, spec.name, DEFAULT_OUTPUT_FILE);

    await mkdirp(path.dirname(resultPath));;
    fs.writeFileSync(resultPath, JSON.stringify(data, null, 4));
};

const generate = async (spec) => {
    console.info("Generating...");
    const inputPath = path.resolve(DEFAULT_OUTPUT_DIR, spec.name, DEFAULT_OUTPUT_FILE);
    const outputPath = path.dirname(inputPath);

    const command =
        `openapi-generator-cli generate ` +
        `-i ${inputPath} ` +
        `-g typescript-axios ` +
        `-t ${DEFAULT_TEMPLATE} ` +
        `-o ${outputPath} ` +
        `-p withInterfaces=true ` +
        `--reserved-words-mappings in=in,function=function ` +
        `--type-mappings=set=Array ` +
        `--additional-properties=enumPropertyNaming=UPPERCASE,useSingleRequestParameter=true,supportsES6=true,modelPropertyNaming='original'`;

    await execPromise(command);
};

const run = async () => {
    try {
        const backend = process.argv[2];
        axios.defaults.baseURL = backend ?? BASE_URL;
        await Promise.all(SPECS.map((spec) => {
            deleteExistSpec();
            downloadSpec(spec);
            generate(spec);
        }));
    } catch (e) {
        console.error("Error: ", e.message);
    }
};

run();
