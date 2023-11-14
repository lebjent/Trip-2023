package tnew.manager.project.code.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import tnew.manager.project.code.dto.AirLinesFormDTO;
import tnew.manager.project.code.entity.AirLines;
import tnew.manager.project.code.entity.Country;
import tnew.manager.project.code.entity.Location;
import tnew.manager.project.code.service.CodeService;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/tripManager")
@Tag(name = "여행코드 API",description = "각종 코드를 가져오는 서비스")
public class CodeController {
	
	private final CodeService service;
	
	@Operation(summary = "국가코드 가져오기", description = "국가코드를 가져오는 서비스")
	@GetMapping(value = "/LEVEL1/getCountyCode")
	public ResponseEntity<?> getCountryCode()throws Exception{
		try {
			List<Country> resultList = service.getCountryCode();
			return ResponseEntity.ok(resultList);
		} catch (Exception e) {
			return ResponseEntity.status(500).body("서버 오류: " + e.getMessage());
		}
	}
	
	@Operation(summary = "항공사 코드 가져오기",description = "항공사코드를 가져오는 서비스")
	@GetMapping(value = "/LEVEL1/getAirLinesCode")
	public ResponseEntity<?> getAirLinesCode()throws Exception{
		try {
			List<AirLines> resultList = service.getAirLinesCode();
			return ResponseEntity.ok(resultList);
		} catch (Exception e) {
			return ResponseEntity.status(500).body("서버 오류: " + e.getMessage());
		}
	}
	
	@Operation(summary = "항공사코드 저장", description = "항공사 코드를 저장하는 서비스")
	@PostMapping(value = "/LEVEL2/savedAirLines")
	public ResponseEntity<?> savedAirLines(@RequestBody AirLinesFormDTO dto)throws Exception{
		
		AirLines airline = AirLines.settingAirLines(dto);
		
		try {
			service.savedAirLines(airline);
			return ResponseEntity.ok("항공사 등록완료");
		} catch (Exception e) {
			return ResponseEntity.status(500).body("서버 오류: " + e.getMessage());
		}
		
	}
	
	@Operation(summary = "항공사코드 중복체크", description = "항공사 코드를 중복체크하는 서비스")
	@PostMapping(value = "/LEVEL1/airlinesCodeDupChk")
	public ResponseEntity<?>airlinesCodeDupChk(@RequestBody AirLinesFormDTO dto) throws Exception{
		
		try {
			boolean result = service.airlinesCodeDupChk(dto.getCode());
			return ResponseEntity.ok(result);
		} catch (Exception e) {
			return ResponseEntity.status(500).body("서버 오류: " + e.getMessage());
		}
		
	}
	
	@Operation(summary = "지역코드 가져오기", description = "지역코드를 가져오는 서비스")
	@GetMapping(value = "/LEVEL1/getLoactionCode")
	public ResponseEntity<?> getLocationCode()throws Exception{
		try {
			List<Location> resultList = service.getLocationCode();
			return ResponseEntity.ok(resultList);
		} catch (Exception e) {
			return ResponseEntity.status(500).body("서버 오류: " + e.getMessage());
		}
	}
	
}
