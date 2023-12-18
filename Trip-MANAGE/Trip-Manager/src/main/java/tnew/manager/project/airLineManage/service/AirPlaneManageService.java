package tnew.manager.project.airLineManage.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
	
	//항공편 리스트 조회
	@Transactional(readOnly = true)
	public Page<AirPlane> getAirPlaneList(Pageable page)throws Exception{
		return repository.getAirPlaneManageList(page);
	}
	
}
