package aoc2017;

import java.io.IOException;
import java.net.URISyntaxException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.stream.Stream;

public interface FileInput {
    default Stream<String> readLines(String filename) throws URISyntaxException, IOException {
        Path path = Paths.get(getClass().getClassLoader().getResource(filename).toURI());
        return Files.lines(path);
    }

    default String loadInputFile(String filename) throws IOException, URISyntaxException {
        return this.readLines(filename).findFirst().orElse("No input!");
    }
}
