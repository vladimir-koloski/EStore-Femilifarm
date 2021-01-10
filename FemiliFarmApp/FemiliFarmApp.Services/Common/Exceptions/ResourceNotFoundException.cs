using System;
using System.Collections.Generic;
using System.Runtime.Serialization;
using System.Text;

namespace FemiliFarmApp.Services.Common.Exceptions
{
    [Serializable]
    public class ResourceNotFoundException : Exception
    {
        public string ResourceName { get; set; }
        public int ResourceId { get; set; }
        public ResourceNotFoundException()
        {
        }

        public ResourceNotFoundException(string message) : base(message)
        {
        }

        public ResourceNotFoundException(string message, Exception innerException) : base(message, innerException)
        {
        }
        public ResourceNotFoundException(string resourceName, int id)
           : this($"{resourceName} with Id: {id} does not exist")
        {
            ResourceName = resourceName;
            ResourceId = id;
        }

        protected ResourceNotFoundException(SerializationInfo serializationInfo, StreamingContext streamingContext)
        {
            ResourceName = serializationInfo.GetString(nameof(ResourceName));
            ResourceId = serializationInfo.GetInt32(nameof(ResourceId));
        }

    }
}
