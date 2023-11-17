package tnew.manager.project.airLineManage.service;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import tnew.manager.project.airLineManage.repository.AirPlaneManageRepository;
import tnew.manager.project.code.entity.AirPlane;

@Service
@RequiredArgsConstructor
public class AirPlaneManageService {
	
	private final AirPlaneManageRepository repository;
	
	//항공편 등록
	public void airPlaneReg(AirPlane airplane) throws Exception{
		repository.save(airplane);
	}
	
}
