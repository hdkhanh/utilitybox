package com.utilitybox.app.services.impls;

import com.utilitybox.app.models.dtos.ApplicationInfo;
import com.utilitybox.app.models.repositories.ApplicationRepository;
import com.utilitybox.app.services.ApplicationService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ApplicationServiceImpl implements ApplicationService {
    private final ApplicationRepository applicationRepository;

    public List<ApplicationInfo> getApplicationsInfo() {
        return applicationRepository.findAll()
                .stream()
                .map(it -> ApplicationInfo.builder()
                        .name(it.getName())
                        .description(it.getDescription())
                        .createDate(it.getCreateDate())
                        .remoteUrl(it.getRemoteUrl())
                        .remoteScope(it.getRemoteScope())
                        .remoteModule(it.getRemoteModule())
                        .build()
                )
                .collect(Collectors.toList());
    }
}
