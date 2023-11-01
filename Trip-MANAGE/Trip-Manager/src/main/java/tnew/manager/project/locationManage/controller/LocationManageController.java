package tnew.manager.project.locationManage.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import tnew.manager.project.code.entity.Country;
import tnew.manager.project.code.entity.Location;
import tnew.manager.project.locationManage.dto.LocationFormDTO;
import tnew.manager.project.locationManage.service.LocationManageService;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/tripManager")
@Tag(name = "여행지역 관리",description = "여행지역을 관리하는 서비스")
public class LocationManageController {
	
	private final LocationManageService service;
	
	@Operation(summary = "여행지역 등록", description = "신규 여행지역을 등록하는 서비스")
	@PostMapping(value = "/locationReg")
	public ResponseEntity<?> locationReg(@RequestBody LocationFormDTO dto) throws Exception{
		try {
			Country country = new Country();
			country.setCode(dto.getCcode());
			Location location = Location.settingLocation(dto, country);
			
			service.locationReg(location);
			
			return ResponseEntity.ok("등록성공");
		} catch (Exception e) {
			return ResponseEntity.status(500).body("서버 오류: " + e.getMessage());
		}
	}
	
}
