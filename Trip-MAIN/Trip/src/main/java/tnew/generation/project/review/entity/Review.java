package tnew.generation.project.review.entity;


import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import tnew.generation.project.common.entity.BaseEntity;
import tnew.generation.project.review.dto.ReviewFormDTO;

@Getter
@Setter
@ToString
@Entity
@Table(name = "review_tbl")//테이블명
public class Review extends BaseEntity {
	
	@Id
	@Column(name = "rno")//컬럼명
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "review_sequence_generator")
	@SequenceGenerator(name = "review_sequence_generator", sequenceName = "review_sequence", allocationSize = 1)
	private Long rno; //게시물 번호
	
	@Column(nullable = false, length=50) //50자이내
	private String title;//제목
	
	@Column(nullable = false, length=10) //10자이내
	private String writer;//작성자명
	
	@Lob//게시판 내용은 용량이 크므로 Lob을 설정
	@Column(nullable = false)
	private String content;//작성내용
	
	@Column(nullable = false, length = 60)
	private String travelArea;
	
	
	@Column(columnDefinition = "number(10) default '0'")
	private int viewCnt; //조회수
	
	@Column(columnDefinition = "number(5)")
	private int rating; //평점
	
	public static Review writeReview(ReviewFormDTO reviewFormDTO) {
		
		//boardFormDTO에 데이터를 담을 Board엔티티 생성자 생성
		Review review = new Review();
		
		review.setContent(reviewFormDTO.getContent());
		review.setTitle(reviewFormDTO.getTitle());
		review.setWriter(reviewFormDTO.getWriter());
		review.setRating(reviewFormDTO.getRating());
		review.setTravelArea(reviewFormDTO.getTravelArea());
		
		return review;
		
	}
	
}




