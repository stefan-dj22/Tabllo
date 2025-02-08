package com.gitproject.Tabllo;
import org.apache.activemq.ActiveMQConnectionFactory;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import javax.jms.ConnectionFactory;

import static org.assertj.core.api.Assertions.assertThat;

public class ActiveMQDemoUTest {
    @Test
    public void testDestinationParsing_valid() throws Exception
    {
        ActiveMQDemo.DestinationInfo di = ActiveMQDemo.parseDestination("/topic/demo-chat");
        assertThat(di.destType).isEqualTo(ActiveMQDemo.DestinationInfo.DEST_TYPE.TOPIC);
        assertThat(di.destName).isEqualTo("demo-chat");

        di = ActiveMQDemo.parseDestination("/queue/demo-chat123");
        assertThat(di.destType).isEqualTo(ActiveMQDemo.DestinationInfo.DEST_TYPE.QUEUE);
        assertThat(di.destName).isEqualTo("demo-chat123");
    }

    @Test
    public void testDestinationParsing_invalid()
    {
        String errorMsg = "";
        try {
            ActiveMQDemo.DestinationInfo di = ActiveMQDemo.parseDestination("/multicast/demo-chat");
        }
        catch (Exception e)
        {
            assertThat(e.getMessage()).contains("dest parameter is not recognized");
        }
        try {
            ActiveMQDemo.DestinationInfo di = ActiveMQDemo.parseDestination("demo-chat");
        }
        catch (Exception e)
        {
            assertThat(e.getMessage()).contains("don't contain '/' in path");
        }
    }
}
