package tnew.manager.project.code.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class AirLinesFormDTO {
	
	@Schema(description = "항공사코드")
	private String code;
	
	@Schema(description = "항공사이름")
	private String airlineName;
	
}
