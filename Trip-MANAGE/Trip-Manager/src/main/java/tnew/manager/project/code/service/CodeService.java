package tnew.manager.project.code.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;
import tnew.manager.project.code.entity.AirLines;
import tnew.manager.project.code.entity.Country;
import tnew.manager.project.code.entity.Location;
import tnew.manager.project.code.repository.AirLinesRepository;
import tnew.manager.project.code.repository.CountryRepository;
import tnew.manager.project.code.repository.LocationRepository;

@Service
@Transactional
@RequiredArgsConstructor
public class CodeService {
	
	//국가코드 Repository
	private final CountryRepository countryRepository;
	
	//항공사코드 Repository
	private final AirLinesRepository airlinesRepository;
	
	//지역코드 Repository
	private final LocationRepository locationRepository;
	
	//국가코드 가져오기
	public List<Country> getCountryCode()throws Exception{
		return countryRepository.findAllByOrderByNameAsc();
	}
	
	//항공사 코드 저장
	public void savedAirLines(AirLines airline)throws Exception{
		airlinesRepository.save(airline);
	}
	
	//항공사 코드 중복체크
    public boolean airlinesCodeDupChk(String code) {
        return airlinesRepository.existsByCode(code);
    }
    
    //항공사 코드 가져오기
    public List<AirLines> getAirLinesCode()throws Exception{
    	return airlinesRepository.findAllByOrderByAirlineNameAsc();
    }
    
    //지역 코드 가져오기
    public List<Location> getLocationCode()throws Exception{
    	return locationRepository.findAllByOrderByNameAsc();
    }
}
