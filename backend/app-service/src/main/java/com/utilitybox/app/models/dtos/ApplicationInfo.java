package com.utilitybox.app.models.dtos;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ApplicationInfo {
    private String name;
    private String description;
    private Instant createDate;
    private String remoteUrl;
    private String remoteScope;
    private String remoteModule;
}
