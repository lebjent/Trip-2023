package tnew.manager.project.airPlaneManage.controller;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import tnew.manager.project.airPlaneManage.dto.AirPlaneListSearchDTO;
import tnew.manager.project.airPlaneManage.dto.AirPlaneManageFormDTO;
import tnew.manager.project.airPlaneManage.entity.AirPlane;
import tnew.manager.project.airPlaneManage.service.AirPlaneManageService;

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
	
	@Operation(summary = "항공편 리스트", description = "항공편을 조회하는 서비스")
	@GetMapping(value = {"/LEVEL1/getAirPlaneList","/LEVEL1/getAirPlaneList/{page}"})
	public ResponseEntity<?>getAirPlaneList(@PathVariable("page") Optional<Integer> page, AirPlaneListSearchDTO searchDTO)throws Exception{
		try {
	        Pageable pageable = PageRequest.of(page.isPresent() ? page.get() : 0, 5);
	        Page<AirPlane> reviewList = service.getAirPlaneList(pageable,searchDTO);
			return ResponseEntity.ok(reviewList);
		} catch (Exception e) {
			return ResponseEntity.status(500).body("서버 오류: " + e.getMessage());
		}
	}
	
}
