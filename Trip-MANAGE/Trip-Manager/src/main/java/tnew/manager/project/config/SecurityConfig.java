package tnew.manager.project.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {
    
    private static final String[] PERMIT_URL_ARRAY = {
            /* swagger v3 */
            "/v3/api-docs/**",
            "/swagger-ui/**",
            
            /* 기본적인 */
            "/tripManager/**"
    };
	
	@Override
    protected void configure(HttpSecurity http) throws Exception {
		
		/*
		 * 개발시 : .csrf().disable().and()  추가 (Swagger API를 사용해서 체크하기 위해)
		 * 운영시 : .csrf().csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse()).and()  추가
		*/
		
    http
    	.cors().and()
        .csrf().disable() // CSRF 보안 비활성화
        .authorizeRequests()
            .antMatchers(PERMIT_URL_ARRAY).permitAll()
            .anyRequest().authenticated()
        .and()    
        .formLogin()
            .loginPage("/login")
            .permitAll()
        .and()
        .logout()
            .permitAll();
    }    

	//스프링에서 제공하는 BCryptPasswordEncoder의 해쉬함수를 사용하여 비밀번호 암호화
	@Bean
	public PasswordEncoder passwordEncoder() {
			return new BCryptPasswordEncoder();
	}
	
}
