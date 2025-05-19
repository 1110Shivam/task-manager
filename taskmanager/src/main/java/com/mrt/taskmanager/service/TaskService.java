// package com.mrt.taskmanager.service;

// import java.util.List;

// import org.springframework.stereotype.Service;

// import com.mrt.taskmanager.entity.Task;
// import com.mrt.taskmanager.entity.User;
// import com.mrt.taskmanager.helpers.ResourceNotFoundException;
// import com.mrt.taskmanager.repository.TaskRepository;

// import lombok.RequiredArgsConstructor;

// @Service
// @RequiredArgsConstructor
// public class TaskService {

//     private final TaskRepository taskRepo;

//     // Create new task
//     public Task createTask(Task task) {
//         return taskRepo.save(task);
//     }

//     // Get tasks for logged-in user
//     public List<Task> getUserTasks(User user) {
//         return taskRepo.findByUser(user);
//     }

//     // Update task (with ownership check)
//     public Task updateTask(Long taskId, Task taskDetails, User currentUser) {
//         Task existingTask = taskRepo.findById(taskId)
//                 .orElseThrow(() -> new ResourceNotFoundException("Task", "id", taskId.toString()));

//         if (!existingTask.getUser().getId().equals(currentUser.getId())) {
//             throw new RuntimeException("Unauthorized to update this task");
//         }

//         existingTask.setTitle(taskDetails.getTitle());
//         existingTask.setDescription(taskDetails.getDescription());
//         existingTask.setDueDate(taskDetails.getDueDate());

//         return taskRepo.save(existingTask);
//     }

//     // Delete task (with ownership check)
//     public void deleteTask(Long taskId, User currentUser) {
//         Task task = taskRepo.findById(taskId)
//                 .orElseThrow(() -> new ResourceNotFoundException("Task", "id", taskId.toString()));

//         if (!task.getUser().getId().equals(currentUser.getId())) {
//             throw new RuntimeException("Unauthorized to delete this task");
//         }

//         taskRepo.delete(task);

//     }

//     public List<Task> searchUserTasks(User user, String keyword) {
//         return taskRepo.findByUserAndTitleContainingIgnoreCaseOrUserAndDescriptionContainingIgnoreCase(
//                 user, keyword, user, keyword);
//     }

// }





package com.mrt.taskmanager.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.mrt.taskmanager.entity.Task;
import com.mrt.taskmanager.entity.User;
import com.mrt.taskmanager.entity.TaskStatus;
import com.mrt.taskmanager.helpers.ResourceNotFoundException;
import com.mrt.taskmanager.repository.TaskRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TaskService {

    private final TaskRepository taskRepo;

    // Create new task
    public Task createTask(Task task) {
        task.setCreatedOn(LocalDateTime.now());
        task.setUpdatedOn(LocalDateTime.now());

        return taskRepo.save(task);
    }

    // Get tasks for logged-in user
    public List<Task> getUserTasks(User user) {
        return taskRepo.findByUser(user);
    }

    // Update task (with ownership check)
    public Task updateTask(Long taskId, Task taskDetails, User currentUser) {
        Task existingTask = taskRepo.findById(taskId)
                .orElseThrow(() -> new ResourceNotFoundException("Task", "id", taskId.toString()));

        if (!existingTask.getUser().getId().equals(currentUser.getId())) {
            throw new RuntimeException("Unauthorized to update this task");
        }

        existingTask.setTitle(taskDetails.getTitle());
        existingTask.setDescription(taskDetails.getDescription());
        existingTask.setDueDate(taskDetails.getDueDate());
        existingTask.setStatus(taskDetails.getStatus());
        existingTask.setRemarks(taskDetails.getRemarks());
        existingTask.setUpdatedOn(LocalDateTime.now());

        return taskRepo.save(existingTask);
    }

    // Delete task (with ownership check)
    public void deleteTask(Long taskId, User currentUser) {
        Task task = taskRepo.findById(taskId)
                .orElseThrow(() -> new ResourceNotFoundException("Task", "id", taskId.toString()));

        if (!task.getUser().getId().equals(currentUser.getId())) {
            throw new RuntimeException("Unauthorized to delete this task");
        }

        taskRepo.delete(task);
    }

    public List<Task> searchUserTasks(User user, String keyword) {
        return taskRepo.searchByUserAndKeyword(
                user, keyword);
    }

    public List<Task> filterTasksByStatus(User user, TaskStatus status) {
        return taskRepo.findByUserAndStatus(user, status);
    }

    public List<Task> sortTasksByDueDate(User user) {
        return taskRepo.findByUserOrderByDueDateAsc(user);
    }
}
