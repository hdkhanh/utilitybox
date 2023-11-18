package com.utilitybox.app.services;

import com.utilitybox.app.models.dtos.ApplicationInfo;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface ApplicationService {
    List<ApplicationInfo> getApplicationsInfo();
}
