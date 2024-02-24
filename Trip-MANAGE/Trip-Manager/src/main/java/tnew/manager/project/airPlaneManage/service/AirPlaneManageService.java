package tnew.manager.project.airPlaneManage.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;
import tnew.manager.project.airPlaneManage.dto.AirPlaneListSearchDTO;
import tnew.manager.project.airPlaneManage.entity.AirPlane;
import tnew.manager.project.airPlaneManage.repository.AirPlaneManageRepository;

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
	public Page<AirPlane> getAirPlaneList(Pageable page, AirPlaneListSearchDTO searchDTO)throws Exception{
		return repository.getAirPlaneManageList(page,searchDTO);
	}
	
}
