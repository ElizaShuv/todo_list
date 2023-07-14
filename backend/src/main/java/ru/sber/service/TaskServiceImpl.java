package ru.sber.service;

import ru.sber.entity.Category;
import ru.sber.entity.Task;
import ru.sber.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TaskServiceImpl implements TaskService {

    private final TaskRepository taskRepository;
    private final CategoryService categoryService;

        @Autowired
        public TaskServiceImpl(TaskRepository taskRepository, CategoryService categoryService) {
            this.taskRepository = taskRepository;
            this.categoryService = categoryService;
        }


    @Override
    public long save(Task task, long categoryId) {
        Category category = categoryService.findById(categoryId);
        if (category != null) {
            task.setCategory(category);
        } else {
            throw new RuntimeException("Категория не найдена");
        }
        return taskRepository.save(task).getId();
    }


    @Override
        public List<Task> findAll(String name) {
            return taskRepository.findAll();
        }

        @Override
        public boolean deleteById(long id) {
            taskRepository.deleteById(id);
            return true;
        }
    }