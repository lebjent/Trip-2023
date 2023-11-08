package tnew.manager.project.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

import lombok.RequiredArgsConstructor;
import tnew.manager.project.common.handler.LogOutHandler;
import tnew.manager.project.common.handler.LoginFailHandler;
import tnew.manager.project.common.handler.LoginSuccessHandler;
import tnew.manager.project.login.service.LoginService;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig extends WebSecurityConfigurerAdapter {
    
    private static final String[] PERMIT_URL_ARRAY = {
            /* swagger v3 */
            "/v3/api-docs/**",
            "/swagger-ui/**",
            
            /* 기본적인 */
            "/tripManager/**"
    };
	
    private final LoginSuccessHandler loginSuccessHandler;
    
    private final LoginFailHandler loginFailHandler;
    
    private final LogOutHandler logOutHandler;
    
    private final LoginService loginService;
    
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
            .authorizeRequests()
            .antMatchers(PERMIT_URL_ARRAY).permitAll()
            .anyRequest().authenticated()
            .and()
            .formLogin()
            .loginProcessingUrl("/tripManager/login") // 로그인 처리 URL 설정
            .usernameParameter("employeeId") // 로그인시 사용할 파라미터 이름
            .successHandler(loginSuccessHandler) // 성공 핸들러 등록
            .failureHandler(loginFailHandler) // 로그인 실패 핸들러 설정
            .permitAll()
            .and()
            .logout()
            .logoutRequestMatcher(new AntPathRequestMatcher("/tripManager/logout")) // 로그아웃 URL 설정
            .logoutSuccessHandler(logOutHandler)
            .permitAll()
            .and()
            .csrf().disable()
            .cors()
            .and()
            .httpBasic();
    }

		
		
	//스프링에서 제공하는 BCryptPasswordEncoder의 해쉬함수를 사용하여 비밀번호 암호화
	@Bean
	public PasswordEncoder passwordEncoder() {
			return new BCryptPasswordEncoder();
	}
	
	//userDetailService를 구현하고 있는 객체로 memberService를 지정해주며, 비밀번호 암호화를 위해 passwordEncoder를 지정
	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception{
		auth.userDetailsService(loginService)
			.passwordEncoder(passwordEncoder());
			
	}
	
}
