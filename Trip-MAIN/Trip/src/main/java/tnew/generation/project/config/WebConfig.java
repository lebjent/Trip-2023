package tnew.generation.project.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
	
	@Value("${uploadPath}")//application.yml에 설정한 uploadPath값 가져오기
	String uploadPath;
	
	@Override
	public void addResourceHandlers(ResourceHandlerRegistry registry) {
		//웹 브라우저 url에 /file로 모든 시작 경우는 uploadPath에 설정한 폴더를 기준으로 파일을 읽어온다.
		registry.addResourceHandler("/file/**") 
				.addResourceLocations(uploadPath);//로컬 컴퓨터에 지정된 파일을 읽어올 root경로를 설정
	}

	@Override
	public void addCorsMappings(CorsRegistry registry) {
		registry.addMapping("/**")
		.allowedOrigins("http://localhost:3000")
		.allowedMethods("GET", "POST", "PUT", "DELETE")
		.allowedHeaders("*")
		.allowCredentials(true)
		.maxAge(3600);
	}
}
