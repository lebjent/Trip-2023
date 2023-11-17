package tnew.manager.project.airLineManage.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import tnew.manager.project.airLineManage.dto.AirPlaneManageFormDTO;
import tnew.manager.project.airLineManage.repository.AirPlaneManageRepository;
import tnew.manager.project.airLineManage.service.AirPlaneManageService;
import tnew.manager.project.code.entity.AirPlane;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/tripManager")
@Tag(name = "항공편 관리",description = "항공편을 관리하는 서비스")
public class AirPlaneManageController {
	
	private final AirPlaneManageService service;
	
	@Operation(summary = "항공편 등록", description = "항공편을 등록하는 서비스")
	@PostMapping(value = "/LEVEL2/airPlaneReg")
	public ResponseEntity<?>airPlaneReg(@RequestBody AirPlaneManageFormDTO dto) throws Exception{
		
		AirPlane airPlane = AirPlane.settingAirPlane(dto);
		
		try {
			service.airPlaneReg(airPlane);
			return ResponseEntity.ok("등록완료");
		} catch (Exception e) {
			return ResponseEntity.status(500).body("서버 오류: " + e.getMessage());
		}
		
	}
	
}
