package com.example.Api.Tarefas.repository;

import com.example.Api.Tarefas.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskRepository extends JpaRepository<Task, Long> {
}