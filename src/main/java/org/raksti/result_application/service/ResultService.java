package org.raksti.result_application.service;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;

import java.io.*;

@Service("resultService")
@Primary
public class ResultService {

    public Object extractObjectFromJson(String id) throws IOException, ParseException {

        JSONParser jsonParser = new JSONParser();

        String path = "static/js/src/VisData.json";

        InputStream is = getFileFromResourceAsStream(path);

        Reader reader = new InputStreamReader(is);
        JSONObject jsonObject = (JSONObject) jsonParser.parse(reader);

        JSONObject object = (JSONObject) jsonObject.get(id);

        return object.get("data");

    }


    private InputStream getFileFromResourceAsStream(String fileName) {

        // The class loader that loaded the class
        ClassLoader classLoader = getClass().getClassLoader();
        InputStream inputStream = classLoader.getResourceAsStream(fileName);

        // the stream holding the file content
        if (inputStream == null) {
            throw new IllegalArgumentException("file not found! " + fileName);
        } else {
            return inputStream;
        }

    }
}
