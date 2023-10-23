package tnew.generation.project.common;

import java.util.Optional;

import org.springframework.data.domain.AuditorAware;

//현재 로그인한 사용자의 정보를 등록자와 수정자로 지정하기 위해 AuditorAware인터페이스를 구현
public class AuditorAwareImpl implements AuditorAware<String> {

	@Override
	public Optional<String> getCurrentAuditor() {
		
		//스프링 시큐리티 적용전		
		
		//Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		
		String userId = "TEST";
		
		/*		
		if(authentication != null) {
			userId = authentication.getName();
		}
		*/
		
		return Optional.of(userId);
	}

	
}
