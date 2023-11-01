package tnew.manager.project.locationManage.service;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import tnew.manager.project.code.entity.Location;
import tnew.manager.project.locationManage.repository.LocationManageRepository;

@Service
@RequiredArgsConstructor
public class LocationManageService {
	
	private final LocationManageRepository locationManageRepository;
	
	
	
	public void locationReg(Location location)throws Exception{
		
		locationManageRepository.save(location);
	}
	
}
