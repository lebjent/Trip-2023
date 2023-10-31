package tnew.manager.project.login.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import tnew.manager.project.common.security.EmployeeInfo;

@RestController
@RequestMapping(value = "/tripManager")
@Tag(name = "로그인정보 API",description = "로그인 관련 서비스")
public class LoginController {
	
	@Operation(summary = "로그인 정보 불러오기", description = "로그인에 성공했으면 로그인 정보를 가져오는 서비스")
	@PostMapping("/getLoginInfo")
	public ResponseEntity<?> getLoginInfo()throws Exception{
		
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		Map<String,Object> loginInfo = new HashMap<>();
		try {
			if(authentication != null) {
				loginInfo.put("loginStatus", "SUCCESS");
				EmployeeInfo employeeInfo = (EmployeeInfo) authentication.getPrincipal();
				loginInfo.put("employeeId", employeeInfo.getEmployeeId());
				loginInfo.put("division", employeeInfo.getDivision());
				loginInfo.put("name", employeeInfo.getName());

			}else {
				loginInfo.put("loginStatus", "FAIL");
			}
			return ResponseEntity.ok(loginInfo);
		} catch (Exception e) {
			return ResponseEntity.status(500).body("서버 오류: " + e.getMessage());
		}
		
	}
	
}
