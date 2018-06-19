@echo off
for %%x in (*.jpg) do (
   echo Optimizing %%x
   jpegtran -copy none -optimize "%%x" temp_optimize.jpg
   jpegtran -copy none -progressive temp_optimize.jpg "%%x"
   del temp_optimize.jpg
)