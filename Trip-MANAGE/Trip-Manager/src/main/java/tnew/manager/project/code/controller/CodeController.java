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
import tnew.manager.project.code.service.CodeService;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/tripManager")
@Tag(name = "여행코드 API",description = "각종 코드를 가져오는 서비스")
public class CodeController {
	
	private final CodeService service;
	
	@Operation(summary = "국가코드", description = "국가코드를 가져오는 서비스")
	@GetMapping(value = "/LEVEL0/getCountyCode")
	public ResponseEntity<?> getCountryCode()throws Exception{
		try {
			List<Country> resultList = service.getCountry();
			return ResponseEntity.ok(resultList);
		} catch (Exception e) {
			return ResponseEntity.status(500).body("서버 오류: " + e.getMessage());
		}
	}
	
	
}
