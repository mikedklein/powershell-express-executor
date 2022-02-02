param (
    [Parameter(Mandatory = $False)]
    [string]$message = "child-shell"
)

Write-Output "This is what you passed in $message"