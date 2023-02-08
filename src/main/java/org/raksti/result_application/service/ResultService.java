package org.raksti.result_application.service;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;

import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.io.Reader;

@Service("resultService")
@Primary
public class ResultService {

    public Object extractObjectFromJson(String id) {

        JSONParser jsonParser = new JSONParser();

        try (Reader reader = new FileReader("src/main/resources/static/js/src/VisData.json")){

            JSONObject jsonObject = (JSONObject) jsonParser.parse(reader);

            JSONObject object = (JSONObject) jsonObject.get(id);

            JSONObject data = (JSONObject) object.get("data");

            return data;

        } catch (IOException | ParseException e) {
            throw new RuntimeException(e);
        }

    }
}
