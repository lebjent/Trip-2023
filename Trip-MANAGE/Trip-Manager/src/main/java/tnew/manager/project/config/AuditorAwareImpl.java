package tnew.manager.project.config;

import java.util.Collection;
import java.util.Optional;

import org.springframework.data.domain.AuditorAware;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsByNameServiceWrapper;

import tnew.manager.project.common.security.EmployeeInfo;

//현재 로그인한 사용자의 정보를 등록자와 수정자로 지정하기 위해서 AuditorAware 인터페이스를 구현한 클래스를 생성
public class AuditorAwareImpl implements AuditorAware<String> {

	@Override
	public Optional<String> getCurrentAuditor() {
		
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		String employeeId = "";
		if(authentication != null) {
			EmployeeInfo employeeInfo = (EmployeeInfo) authentication.getPrincipal();
			employeeId = employeeInfo.getEmployeeId();
		}
		
		return Optional.of(employeeId);
	}
	
}
