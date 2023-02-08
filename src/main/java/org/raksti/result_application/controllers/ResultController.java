package org.raksti.result_application.controllers;

import org.raksti.result_application.service.ResultService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class ResultController {

    private final ResultService resultService;

    public ResultController(ResultService resultService) {
        this.resultService = resultService;
    }

    @GetMapping("/labots")
    public String greeting(@RequestParam String id, Model model) {
        Object data = resultService.extractObjectFromJson(id);
        model.addAttribute("obj", data);
        model.addAttribute("name", "containerId");
        return "greeting";
    }
}
