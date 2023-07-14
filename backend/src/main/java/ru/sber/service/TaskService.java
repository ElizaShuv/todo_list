package ru.sber.service;

import ru.sber.entity.Category;
import ru.sber.entity.Task;

import java.util.List;

public interface TaskService {
    long save(Task task, long categoryId);
    List<Task> findAll(String name);
    boolean deleteById(long id);
}
