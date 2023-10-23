package tnew.generation.project.config;

	
import org.springdoc.core.GroupedOpenApi;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;


@Configuration
public class SwaggerConfig {
	
    //Swagger API 최상단에 들어갈 타이틀 설정
    private static final String API_NAME = "Wedding Bliss Tour API";
    //버전을 기록하는 설정
    private static final String API_VERSION = "0.0.1";
    //그다음 하단에 들어갈 Sub타이틀 설정
    private static final String API_DESCRIPTION = "웨딩블레스투어 프로젝트 API";
	
    @Bean
    public GroupedOpenApi publicApi() {
    	return GroupedOpenApi.builder()
    		   .group("Version-0.0.1")
    		   .pathsToMatch("/**")
    		   .build();
    }
    
    @Bean
    public OpenAPI openAPI() {
        return new OpenAPI()
                .components(new Components())
                .info(apiInfo());
    }
 
    private Info apiInfo() {
        return new Info()
                .title(API_NAME)
                .description(API_DESCRIPTION)
                .version(API_VERSION);
    }
    
}

	
