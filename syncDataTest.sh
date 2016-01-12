#! /bin/sh
java -Xmx250m -jar lib/webharvest_all_2.jar plugins=be.pollepel30.SchoolOnlineBeMasterHash config=lib/schoolOnlineBe.xml loglevel=error workdir=. 

#output=%result%
