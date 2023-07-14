package ru.sber.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;
import ru.sber.entity.Category;
import ru.sber.entity.Task;

import org.springframework.http.ResponseEntity;
//import org.springframework.security.access.prepost.PreAuthorize;
import ru.sber.service.CategoryService;
import ru.sber.service.TaskService;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;

@Slf4j
@RestController
@RequestMapping("tasks")
public class TaskController {

    private final TaskService taskService;


    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }


    @PostMapping
    public ResponseEntity<?> addTask(@RequestParam("categoryId") long categoryId, @RequestBody Task task) {
        long taskId = taskService.save(task, categoryId);
        log.info("Добавление задачи с id: {}", taskId);

        return ResponseEntity.created(URI.create("/tasks/" + taskId)).build();
    }



    @GetMapping
     public List<Task> getTask(@RequestParam(required = false) String name) {
        log.info("Поиск заданий: {}", name);

        return taskService.findAll(name);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTask(@PathVariable long id) {
        boolean isDeleted = taskService.deleteById(id);

        if (isDeleted) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
