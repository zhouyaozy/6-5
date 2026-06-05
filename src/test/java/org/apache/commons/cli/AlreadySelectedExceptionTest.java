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
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertSame;

import org.junit.jupiter.api.Test;

class AlreadySelectedExceptionTest {

    @Test
    void testMessageConstructor() {
        final AlreadySelectedException exception = new AlreadySelectedException("a");

        assertEquals("a", exception.getMessage());
        assertNull(exception.getOption());
        assertNull(exception.getOptionGroup());
    }

    @Test
    void testOptionGroupConstructor() throws AlreadySelectedException {
        final Option selectedOption = new Option("a", "already selected");
        final Option triggeringOption = new Option("b", "triggering option");
        final OptionGroup optionGroup = new OptionGroup();
        optionGroup.addOption(selectedOption);
        optionGroup.addOption(triggeringOption);
        optionGroup.setSelected(selectedOption);

        final AlreadySelectedException exception = new AlreadySelectedException(optionGroup, triggeringOption);

        assertEquals("The option 'b' was specified but an option from this group has already been selected: 'a'", exception.getMessage());
        assertSame(triggeringOption, exception.getOption());
        assertSame(optionGroup, exception.getOptionGroup());
    }
}
