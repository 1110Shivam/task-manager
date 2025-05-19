package com.mrt.taskmanager.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.mrt.taskmanager.entity.Task;
import com.mrt.taskmanager.entity.User;
import com.mrt.taskmanager.entity.TaskStatus;

public interface TaskRepository extends JpaRepository<Task, Long> {

    List<Task> findByUser(User user);

    @Query("SELECT t FROM Task t WHERE t.user = :user AND (LOWER(t.title) LIKE LOWER(CONCAT('%', :keyword, '%')) OR LOWER(t.description) LIKE LOWER(CONCAT('%', :keyword, '%')))")
    List<Task> searchByUserAndKeyword(@Param("user") User user, @Param("keyword") String keyword);

    List<Task> findByUserAndStatus(User user, TaskStatus status);

    List<Task> findByUserAndStatusAndTitleContainingIgnoreCase(
            User user, TaskStatus status, String title);

    List<Task> findByUserOrderByDueDateAsc(User user);
}
