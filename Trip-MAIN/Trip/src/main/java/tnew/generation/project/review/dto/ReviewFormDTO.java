package tnew.generation.project.review.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ReviewFormDTO {
	
	@Schema(description = "리뷰번호")
	private Long rno;
	
	@Schema(description = "제목")
	private String title;
	
	@Schema(description = "작성자명")
	private String writer;
	
	@Schema(description = "작성내용")
	private String content;
	
	@Schema(description = "여행지역")
	private String travelArea;
	
	@Schema(description = "조회수")
	private int viewCnt;
	
	@Schema(description = "평점")
	private int rating;

}
