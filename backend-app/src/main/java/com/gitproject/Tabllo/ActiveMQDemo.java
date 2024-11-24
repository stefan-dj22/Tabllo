package com.gitproject.Tabllo;
import org.apache.activemq.ActiveMQConnectionFactory;
import javax.jms.JMSContext;
import javax.jms.Connection;
import javax.jms.DeliveryMode;
import javax.jms.Destination;
import javax.jms.MessageProducer;
import javax.jms.Session;
import javax.jms.TextMessage;

public class ActiveMQDemo {
    public static class DestinationInfo
    {
        public enum DEST_TYPE {
            TOPIC,
            QUEUE
        }
        public DEST_TYPE destType;
        public String destName;
    }

    public static DestinationInfo parseDestination(String dest) throws Exception
    {
        DestinationInfo result = new DestinationInfo();
        int lastInd = dest.lastIndexOf("/");
        if(lastInd == -1)
            throw new Exception("Destination parameter don't contain '/' in path.");
        if(dest.contains("topic"))
        {
            result.destType = DestinationInfo.DEST_TYPE.TOPIC;
        }
        else if(dest.contains("queue"))
        {
            result.destType = DestinationInfo.DEST_TYPE.QUEUE;
        }
        else
        {
            throw new Exception("Destination type in dest parameter is not recognized");
        }
        result.destName = dest.substring(lastInd + 1);
        return result;
    }

    public static String sendMsg(String dest, String userId, String msg ) throws Exception
    {
        String res = "";
        // Create a ConnectionFactory
        String username = "tabllo_user";
        String password = "tabllo12345";
        ActiveMQConnectionFactory cf = new ActiveMQConnectionFactory("tcp://localhost:61616");
        cf.setUserName(username);
        cf.setPassword(password);

        // Create a Connection
        Connection connection = cf.createConnection();
        connection.start();

        // Create a Session
        Session session = connection.createSession(false, Session.AUTO_ACKNOWLEDGE);

        Destination destination = null;
        // Create the destination (Topic or Queue)
        DestinationInfo di = ActiveMQDemo.parseDestination(dest);
        if(di.destType == DestinationInfo.DEST_TYPE.TOPIC)
        {
            destination = session.createTopic(di.destName);
        }
        else
        {
            destination = session.createQueue(di.destName);
        }

        // Create a MessageProducer from the Session to the Topic or Queue
        MessageProducer producer = session.createProducer(destination);
        producer.setDeliveryMode(DeliveryMode.NON_PERSISTENT);

        // Create a messages
        TextMessage message = session.createTextMessage(msg);
        message.setStringProperty("userId",userId);

        // Tell the producer to send the message
        res = "Sent! dest:"+ dest + "; userId:" + userId +"; msg:"+ msg;
        producer.send(message);

        // Clean up
        session.close();
        connection.close();

        return res;
    }
}
