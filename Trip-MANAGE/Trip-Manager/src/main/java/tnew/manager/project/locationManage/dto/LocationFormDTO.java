package tnew.manager.project.locationManage.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class LocationFormDTO {
	
	@Schema(description = "도시명")
	public String name;
	
	@Schema(description = "공항코드")
	public String acode;
	
	@Schema(description = "국가코드")
	public String ccode;
	
}
