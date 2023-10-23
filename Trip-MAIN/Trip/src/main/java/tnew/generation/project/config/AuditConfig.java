package tnew.generation.project.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.domain.AuditorAware;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

import tnew.generation.project.common.AuditorAwareImpl;


@Configuration
@EnableJpaAuditing//JPA의 기능을 활성화
public class AuditConfig {
	
	@Bean
	public AuditorAware<String> auditorProvider(){//등록자와 수정자를 처리해주는 AuditorAwareImpl빈으로 등록
		return new AuditorAwareImpl();
	}
	
}
