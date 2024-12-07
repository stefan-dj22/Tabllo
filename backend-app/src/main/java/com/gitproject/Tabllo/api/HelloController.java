package com.gitproject.Tabllo.api;

import org.springframework.web.bind.annotation.*;
import com.gitproject.Tabllo.ActiveMQDemo;
import java.util.List;

@RestController
public class HelloController {
    @GetMapping("/")
    public String index() {
        return "Welcome to Tabllo!";
    }

    @GetMapping("/boards")
    public String boards() {
        return "Tabllo boards";
    }

    @RequestMapping(value="/api/demo-amq", method = RequestMethod.GET)
    public String demoChat(
            @RequestParam(required = false) String dest,
            @RequestParam(required = false) String userId,
            @RequestParam(required = false) String msg) {
        try{
            if(dest.isEmpty())
                return "Parameter dest must be filled.";
            else if(userId.isEmpty())
                return "Parameter userId must be filled.";
            else if(msg.isEmpty())
                return "Parameter msg must be filled.";
            return ActiveMQDemo.sendMsg(dest,userId,msg);
        }
        catch (Exception e)
        {
            return  "Exception: " + e.toString();
        }
    }

    @GetMapping("/demo-amq")
    public String simpleDemoPage()
    {
        return
"""
<!DOCTYPE html>
<html>
<body>
<h2>ActiveMQ Test</h2>
<form action="/api/demo-amq" method="get">
  <label for="dest">Destination:</label><br>
  <input type="text" id="dest" name="dest" value="/topic/demo-chat"><br><br>
  <label for="userId">User id:</label><br>
  <input type="text" id="userId" name="userId" value="java_server"><br><br>
  <label for="msg">Message:</label><br>
  <input type="text" id="msg" name="msg" value="Hello from server"><br><br>
  <input type="submit" value="Send">
</form>
</body>
</html>
""";
    }
}
