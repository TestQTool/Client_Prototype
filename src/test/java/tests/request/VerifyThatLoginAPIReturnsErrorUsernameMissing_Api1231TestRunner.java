package tests.request;

import com.intuit.karate.junit5.Karate;

class VerifyThatLoginAPIReturnsErrorUsernameMissing_Api1231TestRunner {
    @Karate.Test
    Karate run() {
        return Karate.run("VerifyThatLoginAPIReturnsErrorUsernameMissing_Api1231").relativeTo(getClass());
    }
}
