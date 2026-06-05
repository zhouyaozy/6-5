/*
  Licensed to the Apache Software Foundation (ASF) under one or more
  contributor license agreements.  See the NOTICE file distributed with
  this work for additional information regarding copyright ownership.
  The ASF licenses this file to You under the Apache License, Version 2.0
  (the "License"); you may not use this file except in compliance with
  the License.  You may obtain a copy of the License at

      https://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
 */

package org.apache.commons.cli;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.Arrays;
import java.util.List;

import org.junit.jupiter.api.Test;

/**
 * Tests {@link AmbiguousOptionException}.
 */
class AmbiguousOptionExceptionTest {

    @Test
    void testConstructorWithMatchingOptions() {
        final List<String> matching = Arrays.asList("alpha", "alphabet");
        final AmbiguousOptionException e = new AmbiguousOptionException("al", matching);
        assertTrue(e.getMessage().startsWith("Ambiguous option: 'al'"), "Message should start with 'Ambiguous option: 'al''");
        assertEquals("al", e.getOption(), "getOption should return the partial option name");
        assertEquals(matching, e.getMatchingOptions(), "getMatchingOptions should return the matching options list");
    }

    @Test
    void testMessageFormatSingleOption() {
        final List<String> matching = Arrays.asList("alpha");
        final AmbiguousOptionException e = new AmbiguousOptionException("a", matching);
        final String message = e.getMessage();
        assertTrue(message.contains("'a'"), "Message should contain the partial option 'a'");
        assertTrue(message.contains("'alpha'"), "Message should contain the matching option 'alpha'");
    }

    @Test
    void testMessageFormatMultipleOptions() {
        final List<String> matching = Arrays.asList("alpha", "alphabet", "alpine");
        final AmbiguousOptionException e = new AmbiguousOptionException("al", matching);
        final String message = e.getMessage();
        assertTrue(message.contains("'alpha'"), "Message should contain 'alpha'");
        assertTrue(message.contains("'alphabet'"), "Message should contain 'alphabet'");
        assertTrue(message.contains("'alpine'"), "Message should contain 'alpine'");
        assertTrue(message.contains(", "), "Message should contain comma-separated matching options");
    }
}
