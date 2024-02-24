package tnew.manager.project.airLineManage.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;
import tnew.manager.project.airLineManage.entity.AirLines;
import tnew.manager.project.airLineManage.repository.AirLinesManageRepository;

@Service
@Transactional
@RequiredArgsConstructor
public class AirLinesManageService {
	
	//항공사코드 Repository
	private final AirLinesManageRepository airlinesRepository;
	
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
	
}
