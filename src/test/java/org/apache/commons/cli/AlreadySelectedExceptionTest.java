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
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

import org.junit.jupiter.api.Test;

/**
 * Tests {@link AlreadySelectedException}.
 */
class AlreadySelectedExceptionTest {

    @Test
    void testConstructorWithString() {
        final AlreadySelectedException e = new AlreadySelectedException("a");
        assertEquals("a", e.getMessage());
        assertNull(e.getOption());
        assertNull(e.getOptionGroup());
    }

    @Test
    void testConstructorWithOptionGroupAndOption() {
        final Option option = new Option("a", "d");
        final OptionGroup optionGroup = new OptionGroup();
        optionGroup.addOption(option);
        final AlreadySelectedException e = new AlreadySelectedException(optionGroup, option);
        assertNotNull(e.getMessage());
        assertEquals(option, e.getOption());
        assertEquals(optionGroup, e.getOptionGroup());
    }

    @Test
    void testMessageFormatWithOptionGroupAndOption() throws AlreadySelectedException {
        final Option optionA = new Option("a", "desc-a");
        final Option optionB = new Option("b", "desc-b");
        final OptionGroup optionGroup = new OptionGroup();
        optionGroup.addOption(optionA);
        optionGroup.addOption(optionB);
        optionGroup.setSelected(optionA);
        final AlreadySelectedException e = new AlreadySelectedException(optionGroup, optionB);
        final String message = e.getMessage();
        assertTrue(message.contains("'b'"), "Message should contain the triggering option 'b'");
        assertTrue(message.contains("'a'"), "Message should contain the already selected option 'a'");
    }
}
