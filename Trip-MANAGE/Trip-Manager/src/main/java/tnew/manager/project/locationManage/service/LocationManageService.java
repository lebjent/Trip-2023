package tnew.manager.project.locationManage.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;
import tnew.manager.project.code.entity.Location;
import tnew.manager.project.locationManage.dto.LocationListSearchDTO;
import tnew.manager.project.locationManage.repository.LocationManageRepository;

@Service
@Transactional
@RequiredArgsConstructor
public class LocationManageService {
	
	private final LocationManageRepository locationManageRepository;
	
	
	//여행지역 등록
	public void locationReg(Location location)throws Exception{
		
		locationManageRepository.save(location);
	}
	
	//여행지역 리스트 불러오기
	@Transactional(readOnly = true)
	public Page<Location> getLocationList(Pageable page, LocationListSearchDTO searchDTO) throws Exception{
		
		return locationManageRepository.getLocaitonListPage(page,searchDTO);
	}
	
	//여행지역 중복코드 체크
	public Boolean acodeDupChk(String acode) throws Exception{
		
		Location location = locationManageRepository.findByAcode(acode);
		Boolean acodeChk = false;
		
		if(location != null) {
			acodeChk = true;
		}else {
			acodeChk = false;
		}
		
		return acodeChk;
		
	}
	
}
