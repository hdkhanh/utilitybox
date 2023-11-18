package com.utilitybox.app.controllers;

import com.utilitybox.app.models.dtos.ApplicationInfo;
import com.utilitybox.app.services.ApplicationService;
import com.utilitybox.share.constants.ApiConstants;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class ApplicationController {
    private final ApplicationService applicationService;

    @GetMapping(ApiConstants.API_APPLICATION_GET_ALL)
    @Operation(summary = "Get all registered applications")
    public ResponseEntity<List<ApplicationInfo>> getAll() {
        return ResponseEntity.ok(applicationService.getApplicationsInfo());
    }
}
