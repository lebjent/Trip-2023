package tnew.generation.project.review.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;

import tnew.generation.project.review.entity.Review;

public interface ReviewRepository extends JpaRepository<Review, Long>,QuerydslPredicateExecutor<Review>,ReviewCustomRepository {

}
