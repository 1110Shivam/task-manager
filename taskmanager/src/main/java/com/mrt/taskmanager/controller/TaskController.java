package com.mrt.taskmanager.controller;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import com.mrt.taskmanager.entity.Task;
import com.mrt.taskmanager.entity.User;
import com.mrt.taskmanager.helpers.ResourceNotFoundException;
import com.mrt.taskmanager.repository.UserRepository;
import com.mrt.taskmanager.service.TaskService;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;

@RestController
@RequestMapping("/api/tasks")
@RequiredArgsConstructor
@Validated
public class TaskController {

    private final TaskService taskService;
    private final UserRepository userRepo;

    @PostMapping("/create")
    public ResponseEntity<Task> createTask(@RequestBody Task task) {
        String userEmail = SecurityContextHolder.getContext().getAuthentication().getName();
        System.out.println("User email: " + userEmail);
        User user = userRepo.findByEmail(userEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User", "email", userEmail));

        task.setUser(user);
        Task savedTask = taskService.createTask(task);
        return new ResponseEntity<>(savedTask, HttpStatus.CREATED);
    }

    @RequestMapping(value = "/get", method = RequestMethod.GET)
    public ResponseEntity<List<Task>> getUserTasks() {
        String userEmail = SecurityContextHolder.getContext().getAuthentication().getName();
        System.out.println("User email: " + userEmail);
        User user = userRepo.findByEmail(userEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User", "email",
                        userEmail));
        List<Task> tasks = taskService.getUserTasks(user);
        System.out.println("Number of tasks: " + tasks.size());

        return new ResponseEntity<>(tasks, HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Task> updateTask(@PathVariable Long id, @RequestBody Task task) {
        String userEmail = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepo.findByEmail(userEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User", "email", userEmail));

        task.setUpdatedOn(LocalDateTime.now());

        Task updatedTask = taskService.updateTask(id, task, user);
        return new ResponseEntity<>(updatedTask, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTask(@PathVariable Long id) {
        String userEmail = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepo.findByEmail(userEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User", "email", userEmail));
        taskService.deleteTask(id, user);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/search")
    public ResponseEntity<List<Task>> searchTasks(@RequestParam String keyword) {
        String userEmail = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepo.findByEmail(userEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User", "email", userEmail));

        List<Task> tasks = taskService.searchUserTasks(user, keyword);
        return new ResponseEntity<>(tasks, HttpStatus.OK);
    }

}
