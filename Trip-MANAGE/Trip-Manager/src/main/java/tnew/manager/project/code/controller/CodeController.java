package tnew.manager.project.code.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
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
