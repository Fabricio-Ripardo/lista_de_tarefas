package com.example.Api.Tarefas.controller;

import com.example.Api.Tarefas.model.Task;
import com.example.Api.Tarefas.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/tasks")
@CrossOrigin(origins = "*")
public class TaskController {

    @Autowired
    private TaskRepository taskRepository;

    @GetMapping
    public List<Task> listarTarefas() {
        return taskRepository.findAll();
    }

    @PostMapping
    public Task criarTarefa(@RequestBody Task task) {
        return taskRepository.save(task);
    }

    @PutMapping("/{id}")
public Task editarTarefa(@PathVariable Long id, @RequestBody Task taskAtualizada) {
    Task task = taskRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Tarefa não encontrada"));

    task.setTitle(taskAtualizada.getTitle());
    task.setCompleted(taskAtualizada.isCompleted());

    return taskRepository.save(task);
}

    @DeleteMapping("/{id}")
    public void deletarTarefa(@PathVariable Long id) {
        taskRepository.deleteById(id);
    }
}