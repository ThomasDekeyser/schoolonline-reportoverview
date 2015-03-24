package be.pollepel30;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

import org.webharvest.exception.PluginException;
import org.webharvest.runtime.Scraper;
import org.webharvest.runtime.ScraperContext;
import org.webharvest.runtime.variables.NodeVariable;
import org.webharvest.runtime.variables.Variable;

public class SchoolOnlineBeMasterHash extends org.webharvest.runtime.processors.WebHarvestPlugin{

	@Override
	public String getName() {
		return "schoolonlinebe-masterhash";
	}	

	   public String[] getValidAttributes() {
	        return getRequiredAttributes();
	    }

	    public String[] getRequiredAttributes() {
	    	return new String[] {"sessionid", "randomid","login","password"};
	    }

	
	@Override
	public Variable executePlugin(Scraper scraper, ScraperContext context) {
		String sessionid = evaluateAttribute("sessionid", scraper);
		String randomid = evaluateAttribute("randomid", scraper);
		String login = evaluateAttribute("login", scraper);
		String password = evaluateAttribute("password", scraper);
		
		String passwordMd5 = getHexMd5(password);
		String loginMd5 = getHexMd5(login);
		String randomMd5 = getHexMd5(randomid);
		StringBuffer parameter = new StringBuffer();
		parameter.append(randomMd5.substring(0, 10));
		parameter.append(loginMd5);
		parameter.append(randomMd5.substring(20, 30));
		parameter.append(getHexMd5(passwordMd5 + sessionid));
		parameter.append(randomMd5.substring(10, 20));
		
		return new NodeVariable(parameter.toString());
	
	}

	
	private static String getHexMd5(String input) {
		try{
			MessageDigest algorithm = MessageDigest.getInstance("MD5");
			algorithm.reset();
			algorithm.update(input.getBytes());
			byte messageDigest[] = algorithm.digest();

			StringBuffer hexString = new StringBuffer();
            for (int i = 0; i < messageDigest.length; i++)
            {
                String hex = Integer.toHexString(0xFF & messageDigest[i]);
                if (hex.length() == 1)
                {
                    hexString.append('0');
                }
                hexString.append(hex);
            }							
			return hexString.toString();
		}catch(NoSuchAlgorithmException nsae){
			throw new PluginException("Error getting hex-md5 hash: " + nsae.getMessage());          
		}			
	}

	public static void main(String[] args) throws NoSuchAlgorithmException {
		String sessionid = "bd1717af6dfae6735b55d41d80d02e9b96f607d3";
		String randomid = "54bef9d3a000d1d1e25c1fd5d3e1990d";
		String login = "sarah";
		String password = "123";
		
		String passwordMd5 = getHexMd5(password);
		String loginMd5 = getHexMd5(login);
		String randomMd5 = getHexMd5(randomid);
		StringBuffer parameter = new StringBuffer();
		parameter.append(randomMd5.substring(0, 10));
		parameter.append(":"+loginMd5);
		parameter.append(":"+randomMd5.substring(20, 30));
		parameter.append(":"+getHexMd5(passwordMd5 + sessionid));
		parameter.append(":"+randomMd5.substring(10, 20));
		
		System.out.println("Masterhash is '"+parameter.toString()+"'");
		System.out.println("LoginMd5Length '"+loginMd5.length()+"'");
		
	}	

}
